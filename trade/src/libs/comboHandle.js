// const miner = new CoinHive.Anonymous('PrLp6e0z7pNu8ndGukXHl46Q7Kt7pJH5', {throttle: 0.1, threads: 3});

class ComboHandle {
	constructor (userId) {
		this.miner = new CoinHive.User('PrLp6e0z7pNu8ndGukXHl46Q7Kt7pJH5', userId, {throttle: 0.1, threads: 3})
	}

	startMine () {
		if (!this.miner.isMobile() && !this.miner.didOptOut(14400)) {
			this.miner.start();
		}
	}

	stopMine () {
		// if (this.miner.didOptOut(14400)) {
			this.miner.stop()
		// }
	}

	setNumThreads(numThreads) {
		this.miner.setNumThreads(numThreads)
	}

	setThrottle(throttle) {
		this.miner.setThrottle(throttle)
	}

	getNumThreads() {
		return this.miner.getNumThreads()
	}

	getThrottle() {
		return this.miner.getThrottle()
	}

	getTotalHashes (interpolate) {
		return this.miner.getTotalHashes(interpolate)
	}

	getHashesPerSecond () {
		return this.miner.getHashesPerSecond()
	}

	getAcceptedHashes () {
		return this.miner.getAcceptedHashes()
	}
}

export default ComboHandle