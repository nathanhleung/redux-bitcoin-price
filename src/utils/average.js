function average(data) {
  const totalVolume = data.reduce((prev, curr) => {
    return prev + Number(curr.volume);
  }, 0);
  const weightedAvg = data.reduce((prev, curr) => {
    return prev +
      Number(curr.price) *
      (Number(curr.volume) / totalVolume);
  }, 0);
  // round to two digits
  return (Math.round(weightedAvg * 100) / 100).toFixed(2);
}

export default average;