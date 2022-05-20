export function formatTime(time) {
  if (time > 12) {
    return `${Number.parseFloat(time).toFixed(0) - 12}`;
  } else {
    return `${Number.parseFloat(time).toFixed(0)}`;
  }
}

export function formatAMPM(hr) {
  return hr >= 12 ? "PM" : "AM";
}
