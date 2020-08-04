export const games = {
  oodle: string => string.replace(/[aeiou]/ig, 'oodle'),
  noVowels: string => string.replace(/[aeiou]/ig, ''),
  reverse: string => string.split('').reverse().join(''),
  reverseWords: string => string
    .split(' ')
    .map(games.reverse)
    .join(' '),
  wideText: string => string
    .split('')
    .map(i => 
      /^[A-z0-9]$/.test(i)
        ? String.fromCharCode(i.charCodeAt(0) + 65248)
        : i
    )
    .join('')
}

