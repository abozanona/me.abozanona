'use strict';

/**
 * Override Hexo's built-in Nunjucks renderer to register all template locals
 * (Hexo helpers: url_for, date, theme, config, page, site, etc.) as Nunjucks
 * globals so they are accessible inside {% macro %} blocks, which do not
 * inherit the parent template's context by default.
 */

const nunjucks = require('nunjucks');
const path = require('path');
const { readFileSync } = require('hexo-fs');

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value.toArray === 'function') return value.toArray();
  if (value instanceof Map) {
    const arr = [];
    value.forEach(v => arr.push(v));
    return arr;
  }
  if (value instanceof Set || typeof value === 'string') return [...value];
  if (typeof value === 'object' && value instanceof Object && Boolean(value)) return Object.values(value);
  return [];
}

function safeJsonStringify(json, spacer) {
  if (typeof json !== 'undefined' && json !== null) {
    return JSON.stringify(json, null, spacer);
  }
  return '""';
}

const nunjucksCfg = {
  autoescape: false,
  throwOnUndefined: false,
  trimBlocks: false,
  lstripBlocks: false,
};

hexo.extend.renderer.register('njk', 'html', function (data, locals) {
  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path.dirname(data.path)),
    nunjucksCfg
  );

  env.addFilter('toarray', toArray);
  env.addFilter('safedump', safeJsonStringify);

  // Expose all Hexo helpers and template variables as Nunjucks globals so
  // they are accessible inside {% macro %} blocks (macros do not inherit the
  // calling template's context in Nunjucks, unlike Swig).
  Object.keys(locals).forEach(key => {
    try {
      env.addGlobal(key, locals[key]);
    } catch (_) { /* ignore non-serialisable values */ }
  });

  const text = readFileSync(data.path);
  return nunjucks.compile(text, env, data.path).render(locals);
}, true); // true = overwrite the built-in renderer
