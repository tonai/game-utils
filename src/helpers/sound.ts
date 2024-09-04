import type { ISoundSources, ISounds } from "../types";

import { randomInt } from "../utils";

const soundInstances: ISounds = {};

export function initSounds(sources: ISoundSources): ISounds {
  for (const [id, source] of Object.entries(sources)) {
    if (typeof source === "string") {
      soundInstances[id] = { instances: [new Audio(source)], source };
    } else {
      soundInstances[id] = source.map((source) => ({
        instances: [new Audio(source)],
        source,
      }));
    }
  }
  return soundInstances;
}

export function playSound(
  name: string,
  volume = 1,
): HTMLAudioElement | undefined {
  if (!(name in soundInstances)) {
    return undefined;
  }

  const list = soundInstances[name];
  const { instances, source } =
    list instanceof Array ? list[randomInt(list.length - 1)] : list;
  let instance = instances.find((instance) => instance.paused);
  if (!instance) {
    instance = new Audio(source);
    instances.push(instance);
  }
  instance.volume = volume;
  instance.play().catch((e) => console.error(e));

  return instance;
}

export function playMusic(
  name: keyof typeof soundInstances,
  volume = 1,
  loop = true,
): HTMLAudioElement | undefined {
  const instance = playSound(name, volume);
  if (instance) {
    instance.loop = loop;
  }
  return instance;
}
