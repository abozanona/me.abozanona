---
title: How to Add Integration Tests to a Golang Gin Project
date: 2025-03-04 23:23:23
categories: technical
---

Integration testing helps ensure that different parts of your application work correctly together. This guide will show you how to add integration tests to a Golang project using the Gin framework.

<!--more-->

## Required Packages

Before starting, install the necessary packages:

```sh
$ go get github.com/stretchr/testify/suite
$ go get github.com/testcontainers/testcontainers-go
```

## Setting Up the Server

Create a function to return the Gin server:

```go
func GetServer() *http.Server {
	// ...

	routersInit := routers.InitRouter()
	server := &http.Server{
		Addr:           endPoint,
		Handler:        routersInit,
		ReadTimeout:    readTimeout,
		WriteTimeout:   writeTimeout,
		MaxHeaderBytes: maxHeaderBytes,
	}
	return server
}
```

Start the server normally in your main file:

```go
server := GetServer()
err := server.ListenAndServe()
if err != nil {
	log.Printf("Server err: %v", err)
}
```

## Creating a Test Database with Testcontainers

To run integration tests, use Testcontainers to set up a PostgreSQL database. The connection string retrieved from the test container should be used later when connecting to the database, depending on whether an integration test is running.

```go
package testintegration

import (
	"context"
	"log"
	"net/http"
	"path/filepath"
	"time"

	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/modules/postgres"
	"github.com/testcontainers/testcontainers-go/wait"
)

type PostgresContainer struct {
	*postgres.PostgresContainer
	ConnectionString string
	Server           *http.Server
	ServerCancel     context.CancelFunc
}

func CreatePostgresContainer(ctx context.Context) (*PostgresContainer, error) {
	pgContainer, err := postgres.RunContainer(ctx,
		testcontainers.WithImage("postgres:15.3-alpine"),
		postgres.WithInitScripts(filepath.Join("..", "migrations", "1728047791947_initial.sql")),
		testcontainers.WithWaitStrategy(
			wait.ForLog("database system is ready to accept connections").WithOccurrence(2).WithStartupTimeout(5*time.Second)),
	)
	if err != nil {
		return nil, err
	}

	connStr, err := pgContainer.ConnectionString(ctx, "sslmode=disable")
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithCancel(context.Background())
	server := GetServer()

	go func() {
		<-ctx.Done()
		if err := server.Shutdown(context.Background()); err != nil {
			log.Printf("Server shutdown error: %v", err)
		}
	}()

	go func() {
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Printf("Server error: %v", err)
		}
	}()

	return &PostgresContainer{
		PostgresContainer: pgContainer,
		ConnectionString:  connStr,
		Server:            server,
		ServerCancel:      cancel,
	}, nil
}
```

## Writing an Integration Test Suite

Use `testify/suite` to manage test setup and teardown.

- **Setup**: We create a test database using Testcontainers and start the test server.
- **Teardown**: We terminate the test database and shut down the test server.

```go
package testintegration

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"testing"

	"github.com/stretchr/testify/suite"
)

type ProjectTestSuite struct {
	suite.Suite
	pgContainer *PostgresContainer
	ctx         context.Context
}

func (suite *ProjectTestSuite) SetupSuite() {
	suite.ctx = context.Background()
	pgContainer, err := CreatePostgresContainer(suite.ctx)
	if err != nil {
		log.Fatal(err)
	}
	suite.pgContainer = pgContainer
}

func (suite *ProjectTestSuite) TearDownSuite() {
	if err := suite.pgContainer.Terminate(suite.ctx); err != nil {
		log.Fatalf("error terminating postgres container: %s", err)
	}
	suite.pgContainer.ServerCancel()
}

func (s *ProjectTestSuite) TestGetEndpointResponse(endpoint string, expectedStruct interface{}) {
	url := fmt.Sprintf("%s%s", "http://localhost:8000", endpoint)

	resp, err := http.Get(url)
	s.Require().NoError(err, "Failed to send GET request")
	defer resp.Body.Close()

	s.Equal(http.StatusOK, resp.StatusCode, "Unexpected status code")

	body, err := ioutil.ReadAll(resp.Body)
	s.Require().NoError(err, "Failed to read response body")

	var actualResponse interface{}
	err = json.Unmarshal(body, &actualResponse)
	s.Require().NoError(err, "Failed to unmarshal response body")

	expectedJSON, err := json.Marshal(expectedStruct)
	s.Require().NoError(err, "Failed to marshal expected struct")

	var expectedResponse interface{}
	err = json.Unmarshal(expectedJSON, &expectedResponse)
	s.Require().NoError(err, "Failed to unmarshal expected JSON")

	s.Equal(expectedResponse, actualResponse, "Response does not match expected struct")
}

func TestProjectTestSuite(t *testing.T) {
	suite.Run(t, new(ProjectTestSuite))
}
```

### Example Test Case

To test an endpoint, call it with the expected response. The function will send a request to the given endpoint, retrieve the response, and compare it to the expected output.

```go
package testintegration

func (suite *ProjectTestSuite) TestGetEndpoint() {
	suite.TestGetEndpointResponse("/api/web/v1/videos", "expected_response")
}
```

## Running the Tests

To run the integration tests, use:

```sh
$ go test -v ./...
```

This will execute all tests in your project.

## Conclusion

By setting up integration tests with Testcontainers and `testify/suite`, you can ensure that your Golang Gin project works correctly with a real database. This approach makes it easier to catch issues early and maintain the quality of your application.

