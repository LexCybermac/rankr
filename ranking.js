class Ranking {
  constructor(items) {
    this.items = items;
    this.comparisons = this.generateComparisons(items.length);
    this.shuffle(this.comparisons);
    this.comparisonsCompleted = 0;
  }

  generateComparisons(n) {
    const comparisons = [];
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        comparisons.push([i, j]);
      }
    }
    return comparisons;
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  updateRatings(result, leftItem, rightItem) {
    const probabilityLeft = leftItem.rating / (leftItem.rating + rightItem.rating);
    const probabilityRight = rightItem.rating / (leftItem.rating + rightItem.rating);
    const learningRate = 0.1;
    const regularizationFactor = 0.01;

    if (result === 1) {
      leftItem.rating += learningRate * (1 - probabilityLeft - regularizationFactor * leftItem.rating);
      rightItem.rating -= learningRate * (probabilityRight + regularizationFactor * rightItem.rating);
    } else if (result === 0) {
      leftItem.rating -= learningRate * (probabilityLeft + regularizationFactor * leftItem.rating);
      rightItem.rating += learningRate * (1 - probabilityRight - regularizationFactor * rightItem.rating);
    } else {
      // No update for a draw as both probabilities sum up to 1
    }
  }
}