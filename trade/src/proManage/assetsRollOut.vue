<template>
<div>
<div>
  <Input v-model="addr" icon="ios-clock-outline" placeholder="Enter address" style="width: 200px"></Input>
  <Button type="success" style="margin-left: 10px;" @click="addrSearch">addr-search</Button>
  <Button type="success" style="float: right;"  @click="refreshData">刷新</Button>
</div>
  <Table stripe border height="200" :columns="titles" :data="assetsRollInData" @on-select="handleSelect" @on-select-all="handleSelectAll"></Table>
  <Button @click="handleAllSucc()">审核通过</Button>
  <Button @click="handleAllFail()">审核失败</Button>
</div>
</template>
<script>
import serverRequest from '../libs/serverRequest.js'
var Web3 = require('web3')
// var web3 = new Web3()

// if (typeof web3 !== 'undefined') {
//   web3 = new Web3(web3.currentProvider)
// } else {
  // set the provider you want from Web3.providers
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
// }
  export default {
    created () {
      // this.queryAllRollInData()
      this.queryEthAccount()  
    },
    data () {
      return {
        assetsRollInData: [],
        currentSelectData: [],
        addr: '',
        titles: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: 'OrderId',
            key: 'orderId',
            width: '100'
          },
          {
            title: 'Address',
            key: 'address'
          },
          {
            title: 'type',
            key: 'assetsType',
            sortable: true,
            width: '100'
          },
          {
            title: 'Amount',
            key: 'amount',
            sortable: true,
            width: '100'
          },
          {
            title: 'State',
            key: 'state',
            sortable: true,
            width: '100'
          },
          {
            title: 'Action',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small',
                        disabled: this.assetsRollInData[params.index].state !== 'uncheck'
                    },
                    style: {
                        marginRight: '5px'
                    },
                    on: {
                        click: () => {
                          this.check(params.index)
                        }
                    }
                }, 'check'),
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small',
                        disabled: this.assetsRollInData[params.index].state !== 'uncheck'
                    },
                    style: {
                        marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.checkOver(this.assetsRollInData[params.index])
                      }
                    }
                }, 'succ'),
                h('Button', {
                    props: {
                        type: 'error',
                        size: 'small',
                        disabled: this.assetsRollInData[params.index].state !== 'uncheck'
                    },
                    on: {
                        click: () => {
                          this.delete(this.assetsRollInData[params.index])
                        }
                    }
                }, 'fail')
              ]);
            }
          }
        ]
      }
    },
    methods: {
      handleSelectAll (selection) {
        this.currentSelectData = selection.slice(0)
      },
      handleSelect (selection) {
        this.currentSelectData = selection.slice(0)
      },
      handleAllSucc () {
        this.currentSelectData.forEach(item => {
          this.checkOver(item)
        })
      },
      handleAllFail () {
        this.currentSelectData.forEach(item => {
          this.delete(item)
        })
      },
      queryEthAccount () {

        // 查询eth上的账户
        // web3.eth.defaultAccount = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';
        // web3.eth.coinbase = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';
        // web3.eth.getBalance('0x627306090abaB3A6e1400e9345bC60c78a8BEf57', function (error, result) {
        //   if (!error) {
        //     console.log(error + ': ' + result)
        //   }
        //   console.log('result: ',result)
        // })

        // 转账
        // web3.eth.sendTransaction({from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57', to: '0xf17f52151EbEF6C7334FAD080c5704D77216b732', value: '9995799999999999999'})

        // 获取本机的账户列表
        // web3.eth.getAccounts(function(err, acc) { 
        //   acc.forEach((item, e) => {
        //     console.log('item:',item)
        //     web3.eth.getBalance(item, function (error, result) {
        //       if (!error) {
        //         console.log(e + ': ' + result)
        //       }
        //       console.log('result: ',result)
        //     })
        //   })
        // })
        // web3.fromWei(web3.eth.getBalance('0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef'))

        console.log(web3.isConnected())
      },
      refreshData () {
        this.queryAllRollInData()
      },
      check (index) {

      },
      delete (item) {
        if (!item) return
        let assetsData = {
          id: 1,
          orderId: item.orderId,
          count: item.amount,
          addr: item.address,
          type: item.assetsType,
          state: 'fail'
        }
        serverRequest.deleteRollOutOrder(assetsData)
        .then(v => {
          let succCb = () => {}
          let errCb = () => {
            this.alertErrInfo(v.data)
          }
          serverRequest.handleRequestRes(v.data, succCb, errCb)
        })
        .catch (e => {
          console.log(e)
        })
      },
      checkOver (item) {
        if (!item) return
        let assetsData = {
          id: 1,
          orderId: item.orderId,
          count: item.amount,
          addr: item.address,
          type: item.assetsType,
          state: 'done'
        }
        serverRequest.checkOverRollOutOrder(assetsData)
        .then(v => {
          let succCb = () => {}
          let errCb = () => {
            this.alertErrInfo(v.data)
          }
          serverRequest.handleRequestRes(v.data, succCb, errCb)
        })
        .catch (e => {
          console.log(e)
        })
      },
      queryAllRollInData () {
        console.log('queryAllRollInData')
        serverRequest.queryAllRollOutAssets()
        .then(v => {
          let succCb = () => {
            this.assetsRollInData = this.formatAssetsRes(v.data.res.data)
          }
          let errCb = () => {
            this.alertErrInfo(v.data)
          }
          serverRequest.handleRequestRes(v.data, succCb, errCb)
        })
        .catch (e => {
          console.log(e)
        })
      },
      addrSearch () {
        if (this.addr !== '') {
          serverRequest.queryRollOutAssetsByAddr(this.addr)
          .then(v => {
            let succCb = () => {
              this.assetsRollInData = this.formatAssetsRes(v.data.res.data)
            }
            let errCb = () => {
              this.alertErrInfo(v.data)
            }
            serverRequest.handleRequestRes(v.data, succCb, errCb)
          })
          .catch (e => {
            console.log(e)
          })
        }
      },
      show (index) {

      },
      remove (index) {

      },
      formatAssetsRes (data) {
        let formatData = []
        data.forEach((item) => {
          formatData.push({
            orderId: item.orderId,
            address: item.uaddr,
            assetsType: item.uassetsType,
            amount: item.uamount,
            state: item.ustate
          })
        })
        return formatData
      },
      alertSuccInfo (msg) {
        this.$Message.success({
          top: 200,
          content: msg
          // content: data.res.msg
        })
      },
      alertErrInfo (data) {
        let errMsg = ''
        if (data.msg) {
          errMsg = data.msg
        } else if (data.res && data.res.msg) {
          errMsg = data.res.msg
        } else {}
        this.$Message.error({
          top: 200,
          content: errMsg
        })
      }
    }
  }
</script>