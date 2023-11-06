const app = Vue.createApp({
	data() {
		return {
			input: "",
			ranking: null,
			progressBarValue: 0,
			itemsList: [],
			appState: "input",
		};
	},
	computed: {
	comparisonItems() {
		if (this.appState !== 'ranking' || !this.ranking) return [{ string: "Option 1" }, { string: "Option 2" }];

		const currentItemIndices = this.ranking.comparisons[this.ranking.comparisonsCompleted] || [];
		return currentItemIndices.map((index) => this.ranking.items[index]);
	},
		sortedResults() {
			return this.itemsList.slice().sort((a, b) => b.rating - a.rating);
		},
		startButtonLabel() {
			return this.appState === "ranking" ? "Start Over" : "Start Ranking";
		},
		choiceButtonsDisabled() {
			return this.appState !== "ranking";
		},
		showResults() {
			return this.appState === 'results' || this.ranking;
		},
	},
	methods: {
		getComparisonItem(position) {
			if (!this.ranking) return null;
			const currentItemIndex = this.ranking.comparisons[this.ranking.comparisonsCompleted][position];
			return this.ranking.items[currentItemIndex];
		},
		startRanking() {
			this.resetRanking(this.input.trim().split("\n").map((item, index) => ({ id: index, string: item, rating: 1 })));
			this.appState = "ranking";
		},
		resetRanking(items) {
			this.ranking = new Ranking(items);
			this.itemsList = items;
			this.progressBarValue = 0;
		},
		choose(choiceASelected) {
			this.ranking.updateRatings(choiceASelected ? 0 : 1, ...this.comparisonItems);
			this.ranking.comparisonsCompleted++;
			this.progressBarValue = (this.ranking.comparisonsCompleted / this.ranking.comparisons.length) * 100;
			if (this.ranking.comparisonsCompleted >= this.ranking.comparisons.length) this.appState = "results";
		},
		backToInput() {
			this.appState = "input";
			this.progressBarValue = 0;
			this.ranking = null;
		},
	},
});

app.mount("#rankingApp");