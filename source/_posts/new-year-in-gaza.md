---
title: New Year's Eve in Gaza Amidst Shattered Lives
date: 2024-01-01 23:23:23
categories: diary
---

<iframe height="250" src="https://www.youtube.com/embed/PwHr_vmW-oo" style="width:100%;"></iframe>

<!--more-->


<link rel="stylesheet" href="https://demos.ramon.codes/zuck.js/dist/skins/snapgram.css">
<link rel="stylesheet" href="https://demos.ramon.codes/zuck.js/dist/zuck.min.css">
<style>.tip.link {pointer-events: none;} #zuck-modal.with-effects{position: fixed !important;}</style>

<div id="stories" class="storiesWrapper"></div>

<script>
    getAvatar = (id) => "https://robohash.org/" + id
    var currentSkin = {
      avatars: true,
      list: false,
      autoFullScreen: false,
      cubeEffect: true,
      paginationArrows: false
    };

    var zuckScript      = document.createElement('script');
    zuckScript.src      = "https://demos.ramon.codes/zuck.js/dist/zuck.min.js";
    zuckScript.async    = false; 
    document.body.appendChild(zuckScript); 
    
    zuckScript.addEventListener('load', () => {
        fetch("/assets/stories.json?v=2").then(res => res.json()).then(res => {
            let storiesList = [];
            for(el of res) {
                if(el.count) {
                    storiesList.push(...Array(el.count).fill(el).map((st, indx) => ({...st, url: st.url + "&index="+indx})))
                } else {
                    storiesList.push(el);
                }
            }
            groupArray = storiesList.reduce((group, entry) => {
                const time = new Date(entry.time).toISOString().split('T')[0];
                    group[time] = group[time] ?? [];
                    group[time].push(entry);
                    return group;
                }, {});
            groupArray = Object.entries(groupArray).map(el =>  {
                    return Zuck.buildTimelineItem(
                        el[0], 
                        getAvatar(el[0]),
                        el[0],
                        "",
                        new Date(el[1][0]).getTime() / 1000,
                        el[1].map(story => ([
                            story.time, story.type, 10, story.url, false, story.description?'#!':false, story.description, false, new Date(story.time).getTime() / 1000
                        ]))
                    )
                })
            let reversedArray = groupArray.reverse();
            var stories = new Zuck('stories', {
                backNative: true,
                previousTap: true,
                skin: currentSkin['name'],
                autoFullScreen: currentSkin.autoFullScreen,
                avatars: currentSkin.avatars,
                paginationArrows: currentSkin.paginationArrows,
                list: currentSkin.list,
                cubeEffect: currentSkin.cubeEffect,
                localStorage: true,
                stories: reversedArray
            }
            )
        });
    });
</script>


In whose words would i write this? Who is more deserving to speak in the wake of the resistance? The faceless bunch that chose to free us all, But have they even a choice?

They say you should never meet your heroes, those who have been glorified by the screen and  don't extend depth beyond the surface...but my heroes are real, they are so real i see them everyday and on every platform, and if you guide your steps away from the pit of lies you are tossed in everyday, you would see them too. In your father, a man who has lost his beloved wife and all the blessings she gave him in nine children, hugs the bricks of his fallen home screaming in the dust "who do i hug now!"

In your mom, a force of a woman carrying the remains of her two babies in plastic bags to give them a proper barial, a force so fierce that she hugs her daughter with missing limps and open flesh laying on the hospital bed for the last time. 

But now, it's been a couple of cold hours and you can no longer see your mom at all, a deep heavy void sets inside of you as you start to gather the pieces one by one, "Is this her arm? No this is my sister's ring...is my sister gone too? But I just saw her with..."

Yes she is gone too, so is your brother, his wife and son, his favorite toys are among the rubble of what once used to be your childhood neighborhood, years and years of memories erased. "Hey there is a batman t-shirt peeking from under these stones maybe this kid is still alive", was that his favorite super hero too? Little did he know that these big companies' funds would be the end of him, and for years to come we would say that our favorite super hero was you. When you saw your wife tearfully holding a positive pregnancy test, did you also see her 8 months pregnant getting run over by an IOF truck to death? What was her fault? 

Ah yes, the most recurring question "what was their fault?" 

The truth is, and the truth is beyond negotiable after 80 days of horror on earth, that they didn't stand a chance in the face of this vicious world, a world where power consumes, power devours...and what moves the world around these man-made realms of greed is in its short, power. It consumes their minds and makes them do the unthinkable, the more they get the more they seek in all the endless ways that they can fathom. And do not get me wrong dear reader, i am in no way trying to draw excuses for their devious behaviors, in fact, i despise them to my core, and wish upon them the ugliest forms of torture for what the have done, for what they have not to stop this madness. "20 minute lunch break and we will resume afterwards" the sickening irony as you arabs gather around fancy feasts as more babies will get killed before finding a bite to eat, the same babies you gathered in your pretend fiasco to save.

Did we put the wrong men in charge? We have been for centuries, but how could we have not seen the rotting evil behind those voided dark eyes, the same eyes that see the piles of blood and bone and command for more, "MORE MORE! We want to build skyscrapers and theme parks with their bones", were we also consumed in greed by their empty promises?. Maybe but certainly we are victims too, victims to the middle class and lower life-long curse, and yet we are not the ones being bombed to death day and night, forced to watch our families die...starve and freeze in shallow tents. And no solution, no truce, will save them from the unimaginable pain and heart ache that will settle down on them once this round of war is over, once the emptiness of all they have lost from souls and fortune kicks in...can you imagine? Your house several footsteps echoing less, or perhaps, not echoing at all...i read a phrase 40 days of war earlier that deeply resonated in me: "who will open the door for the kids knocking coming home from school in Gaza? They haven't left anyone to knock the door or open the door" and mind you, they haven't even spared the door. 

If you have experienced death around you, you may know that there is a bitter comfort in saying your last goodbye to a loved one, getting the chance to conclude a life-time of their existence and resonate the feeling that they have moved on, so you can mourn in peace. My heart aches as i know that thousands of my brothers and sisters in Gaza did not get the chance, the bare minimum to ease their pain turned to an open wound that will never shut. Instead, they were faced with body bags filled with limps and uncertainty whether the child in that bag is their own, "what if he is still out there somewhere under the rubble, what if he is still alive?". At some point, it became a privilege to end up in a body bag, because the alternative is to lay under the weight of what used to be your home fading away un-found as your corpse decays to bones. 

Is death more merciful in these times? I presume many wish for it and i wonder if i would too, mind you reader i keep asking these questions as i myself can not imagine being in their place, they are people just as normal as you and i and yet, they have experienced the worst of what humanity has to offer. I couldn't imagine being faced with a doctor about to cut off my limps or ease my burning flesh without anesthesia,...they ran out, as they are running out of all life essentials, the whole world in its might and power can not order to allow help to go in (or it may not align with their agenda, vile vile world) let alone stop the war entirely.

It has been proven that Israel has a major influence in the world, rotting evil veining in every direction and on every level, it would be ridiculous to not assume this mastermind plan has been going on from the beginning, 75 years of torture and humiliation of my people over what is rightfully theirs... and if you have by now, as i hope you have, stepped away from the pit of lies they have so masterfully catered for you, then the screams of thousands of oppressed indigenous people will come out shouting back at you.

It is in the nature we were created for, that we shall live on this earth as successors generation after generation to benefit ourselves and others. It is in the human nature to look after each other and all of God's creation. In other words, let us all count our blessings with every passing breath that we continue to live a "normal" life, let us use those precious breaths to speak up louder and further on the injustice happening right under our noses. I damn you a life time of miserable mediocrity if you think this does not concern you, how do you know you are not next? Did you find comfort in your overrated, overpriced blood thirsty coffees? does it feel like a fresh good morning when thousands of children didn't wake up that day? 

Those heroes i see everyday come in many shapes and forms, some wear sandals running from one bombing to another, some barefoot carrying their feline friends to safety, and some of which wear blue vests...the same blue vests behind every lens you see this monstrosity through. It is a most noble act to carry the truth as honest as you can, and even more furtherly noble when you choose to risk your life for it, but again, have they even a choice? "Not all heroes wear capes, some wear blue vests" and in these heroes we collectively put in a thousand blessings of gratitude for that their images, single handed alternated the outlook of the war on Gaza specifically, and Palestinians generally. Oh how proud and blessed i am to be Palestinian living on this holy land, in my veins runs the same courageous blood scattered vividly on the eastern coast of the Mediterranean...just a little to the south.

"No one is spared, not even the animals" as the video shows a heavily injured cat laying silently on the cold aftermath of destruction, not even the voiceless, most innocent creatures were spared, a horse carrying the freshly injured victims to the hospital was bombed relentlessly immobile to the ground...who will aid the injured? Who will feed the rest? When all there is left are dire piles of stones. They used to have lovely homes to roam, now they hopelessly roam the empty streets in doomed attempts to find scraps. 

01/01/2024, peace be upon your precious souls that gracefully joined the one and only savior above all, may you find a most deserved eternity of peace and comfort in the hands of the most powerful among your loved ones once more, where laughter never stops echoing and food never runs out, how I imagine you all on the sands of a glistening sea, finally enjoying it without fear, what is rightfully yours will always find its way back to you, God will make sure of that, and in God we place our trust. 

Silly isn't it? We enter a new year in this blip of time and the rockets continue to go up, but not the kind that shoot out pretty lights.