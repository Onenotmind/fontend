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
  export default {
    created () {
      this.queryAllRollInData()
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
            key: 'orderId'
          },
          {
            title: 'Address',
            key: 'address'
          },
          {
            title: 'receiver',
            key: 'receiver'
          },
          {
            title: 'type',
            key: 'assetsType',
            sortable: true
          },
          {
            title: 'Amount',
            key: 'amount',
            sortable: true
          },
          {
            title: 'State',
            key: 'state',
            sortable: true
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
                        disabled: this.assetsRollInData[params.index].state === 'pending'
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
                        disabled: this.assetsRollInData[params.index].state !== 'pending'
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
                        disabled: this.assetsRollInData[params.index].state !== 'pending'
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
        serverRequest.deleteRollInOrder(assetsData)
        .then(v => {
          let succCb = () => {
            this.alertSuccInfo('operate success.')
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
      checkOver (item) {
        if (!item) return
        let assetsData = {
          id: 1,
          orderId: item.orderId,
          count: item.amount,
          addr: item.address,
          type: item.assetsType,
          receiver: item.receiver,
          state: 'success'
        }
        console.log('checkOver')
        serverRequest.checkOverRollInOrder(assetsData)
        .then(v => {
          let succCb = () => {
            this.alertSuccInfo('operate success.')
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
      queryAllRollInData () {
        serverRequest.queryAllRollInAssets()
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
          serverRequest.queryRollInAssetsByAddr(this.addr)
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
            orderId: item.pk_id,
            address: item.idx_addr,
            receiver: item.receiver,
            assetsType: item.assetsType,
            amount: item.amount,
            state: item.state
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