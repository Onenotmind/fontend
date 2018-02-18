<template>
<div>
<div>
  <Input v-model="addr" icon="ios-clock-outline" placeholder="Enter address" style="width: 200px"></Input>
  <Button type="success" style="margin-left: 10px;" @click="addrSearch">addr-search</Button>
  <Button type="success" style="float: right;"  @click="refreshData">刷新</Button>
</div>
  <Table stripe border height="200" :columns="titles" :data="assetsRollInData"></Table>
  <Button @click="handleSelectAll(true)">选择全部</Button>
  <Button @click="handleSelectAll(false)">取消全选</Button>
</div>
</template>
<script>
import serverRequest from '../libs/serverRequest.js'
  export default {
    created () {
      this.queryAllRollInData()
    },
    data () {
      return {
        assetsRollInData: [],
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
                        size: 'small'
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
                        size: 'small'
                    },
                    style: {
                        marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.checkOver(params.index)
                      }
                    }
                }, 'done'),
                h('Button', {
                    props: {
                        type: 'error',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                          this.delete(params.index)
                        }
                    }
                }, 'Delete')
              ]);
            }
          }
        ]
      }
    },
    methods: {
      handleSelectAll (status) {
        this.$refs.selection.selectAll(status)
      },
      refreshData () {
        this.queryAllRollInData()
      },
      check (index) {

      },
      checkOver (index) {
        let assetsData = {
          id: 1,
          orderId: this.assetsRollInData[index].orderId,
          count: this.assetsRollInData[index].amount,
          addr: this.assetsRollInData[index].address,
          type: this.assetsRollInData[index].assetsType,
          state: 'done'
        }
        serverRequest.checkOverRollInOrder(assetsData)
        .then(v => {
          let succCb = () => {}
          let errCb = () => {}
          this.handleRequestRes(v.data, succCb, errCb)
        })
        .catch (e => {
          console.log(e)
        })
      },
      queryAllRollInData () {
        serverRequest.queryAllRollInAssets()
        .then(v => {
          let succCb = () => {
            this.assetsRollInData = this.formatAssetsRes(v.data.res.data)
            console.log(this.assetsRollInData)
          }
          let errCb = () => {}
          this.handleRequestRes(v.data, succCb, errCb)
        })
        .catch (e => {
          console.log(e)
        })
      },
      addrSearch () {
        if (this.addr !== '') {
          serverRequest.queryRollInAssetsByAddr(this.addr)
          .then(v => {
            let succCb = () => {
              this.assetsRollInData = this.formatAssetsRes(v.data.res.data)
            }
            let errCb = () => {}
            this.handleRequestRes(v.data, succCb, errCb)
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
      handleRequestRes (data, succCb, errCb) {
        let succ = () => {
          this.$Message.success({
            top: 200,
            content: data.res.msg
          })
          succCb()
        }
        let err = () => {
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
          errCb()
        }
        serverRequest.handleRequestRes(data, succ, err)
      }
    }
  }
</script>