const UserModel = {
	addr: 'uk_addr',
	email: 'uk_email',
	tradePwd: 'utradePwd',
	account: 'uk_account',
	latitude: 'latitude',
	longitude: 'longitude'
}

const PandaModel = {
	gen: 'uk_gen',
	addr: 'idx_addr',
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
	nameEn: 'nameEn',
	productId: 'uk_productId',
	id: 'pk_id',
	product_addr: 'userRealAddr',
	product_name: 'userName',
	product_phone: 'userPhone',
	state: 'state',
	idx_productId: 'idx_productId',
	recommender: 'recommender',
	time: 'time',
	productType: 'idx_productType'
}

const AssetsModel = {
	eth: 'eth',
	ethLock: 'ethLock',
	eos: 'eos',
	eosLock: 'eosLock',
	bamboo: 'bamboo',
	bambooLock: 'bambooLock'
}

const OrderModel = {
	id: 'pk_id',
	addr: 'idx_addr',
	type: 'assetsType',
	amount: 'amount',
	state: 'state',
	create: 'gmt_create',
	receiver: 'receiver'
}

module.exports = {
	UserModel: UserModel,
	PandaModel: PandaModel,
	LandModel: LandModel,
	AssetsModel: AssetsModel,
	OrderModel: OrderModel
}