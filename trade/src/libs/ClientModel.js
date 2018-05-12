const UserModel = {
	addr: 'uk_addr',
	email: 'uk_email',
	tradePwd: 'utradePwd'
}

const PandaModel = {
	gen: 'uk_gen',
	state: 'idx_state',
	price: 'price',
	integral: 'integral',
	speed: 'speed',
	hungry: 'hungry',
	goldCatch: 'goldCatch',
	woodCatch: 'woodCatch',
	waterCatch: 'waterCatch',
	earthCatch: 'earthCatch',
	fireCatch: 'fireCatch',
	special: 'special'
}

const LandModel = {
	src: 'imgSrc',
	value: 'value',
	name: 'name',
	productId: 'uk_productId',
	recommender: 'recommender',
	time: 'time'
}

const AssetsModel = {
	eth: 'eth',
	ethLock: 'ethLock',
	eos: 'eos',
	eosLock: 'eosLock',
	bamboo: 'bamboo',
	bambooLock: 'bambooLock'
}

module.exports = {
	UserModel: UserModel,
	PandaModel: PandaModel,
	LandModel: LandModel,
	AssetsModel: AssetsModel
}