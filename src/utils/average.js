function average(data) {
  const totalVolume = data.reduce((prev, curr) => {
    return prev + Number(curr.volume);
  }, 0);
  const weightedAvg = data.reduce((prev, curr) => {
    return prev +
      Number(curr.price) *
      (Number(curr.volume) / totalVolume);
  }, 0);
  return weightedAvg
}

export default average;