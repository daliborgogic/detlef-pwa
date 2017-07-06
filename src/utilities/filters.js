export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo (time) {
  const unix = new Date(time).getTime() / 1000
  const between = Date.now() / 1000 - Number(unix)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else if (between < 2.628e+6){
    return pluralize(~~(between / 86400), ' day')
  } else if (between < 31535965.4396976) {
    return pluralize(~~(between / 2.628e+6), ' month')
  } else {
    return pluralize(~~(between / 31535965.4396976), ' year')
  }
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}
