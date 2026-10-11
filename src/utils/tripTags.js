// Trip-type tags — one-tap categorization. The curated list stays short
// and opinionated; a "Custom" input lets users name their own trip type
// so the list doesn't need to grow forever.
//
// Shared between AddMemoryModal (set at creation / edit), Memories.js
// (chip on the wall card + filter chips), and ShareMemoryPost (poster
// stamp). Keep the preset list stable — label text is used as the
// stored value, so renaming "Honeymoon" would orphan existing data.
export const TRIP_TAGS = [
  { id: 'first_solo',   label: 'My First Solo Trip', emoji: '🎒' },
  { id: 'solo',         label: 'Solo Trip',          emoji: '🧳' },
  { id: 'honeymoon',    label: 'Honeymoon',          emoji: '💍' },
  { id: 'anniversary',  label: 'Anniversary',        emoji: '🥂' },
  { id: 'family',       label: 'Family Trip',        emoji: '👨‍👩‍👧' },
  { id: 'friends',      label: 'With Friends',       emoji: '👯' },
  { id: 'summer',       label: 'Summer Vacation',    emoji: '☀️' },
  { id: 'winter',       label: 'Winter Escape',      emoji: '❄️' },
  { id: 'business',     label: 'Business Trip',      emoji: '💼' },
  { id: 'school',       label: 'School Trip',        emoji: '🎓' },
  { id: 'reunion',      label: 'Reunion',            emoji: '🤝' },
  { id: 'birthday',     label: 'Birthday Trip',      emoji: '🎂' },
  { id: 'bucket',       label: 'Bucket List',        emoji: '✨' },
  { id: 'roadtrip',     label: 'Road Trip',          emoji: '🚗' },
  { id: 'adventure',    label: 'Adventure',          emoji: '⛰️' },
  { id: 'backpacking',  label: 'Backpacking',        emoji: '🥾' },
  { id: 'wellness',     label: 'Wellness Retreat',   emoji: '🧘' },
  { id: 'festival',     label: 'Festival',           emoji: '🎉' },
  { id: 'pilgrimage',   label: 'Pilgrimage',         emoji: '🙏' },
  { id: 'weekend',      label: 'Weekend Getaway',    emoji: '🌴' },
];

// Fast O(1) lookup of the emoji that matches a tag label, so the chip on
// the memory card can render "💍 Honeymoon" without searching the array
// on every render.
const EMOJI_BY_LABEL = Object.fromEntries(
  TRIP_TAGS.map(t => [t.label.toLowerCase(), t.emoji])
);

export function emojiForTag(label) {
  if (!label) return '🏷️';
  return EMOJI_BY_LABEL[String(label).toLowerCase()] || '🏷️';
}

export function isPresetTag(label) {
  if (!label) return false;
  return EMOJI_BY_LABEL[String(label).toLowerCase()] !== undefined;
}
