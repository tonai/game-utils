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
  // eslint-disable-next-line no-console
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

export function playSequence(
  sequence: (keyof typeof soundInstances)[],
  volume = 1,
  ref: { current: HTMLAudioElement | undefined } = { current: undefined },
): { current: HTMLAudioElement | undefined } {
  const name = sequence.shift();
  if (name) {
    if (sequence.length > 0) {
      ref.current = playSound(name, volume);
      ref.current?.addEventListener("ended", () => {
        playSequence(sequence, volume, ref);
      });
    } else {
      ref.current = playMusic(name, volume);
    }
  }
  return ref;
}
