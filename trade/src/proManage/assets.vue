<template>
<div>
  <Table stripe border height="200" :columns="titles" :data="assetsData"></Table>
  <Button @click="handleSelectAll(true)">选择全部</Button>
  <Button @click="handleSelectAll(false)">取消全选</Button>
</div>
</template>
<script>
import serverRequest from '../libs/serverRequest.js'
  export default {
    created () {
      serverRequest.queryAllAssets()
      .then(v => {
        let succCb = () => {
          this.assetsData = this.formatAssetsRes(v.data.res.data)
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
    data () {
      return {
        assetsData: [],
        titles: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: 'Address',
          key: 'address'
        },
        {
          title: 'Eth',
          key: 'eth',
          sortable: true,
          width: '80'
        },
        {
          title: 'Eos',
          key: 'eos',
          sortable: true,
          width: '80'
        },
        {
          title: 'EthLock',
          key: 'ethLock',
          sortable: true,
          width: '110'
        },
        {
          title: 'EosLock',
          key: 'eosLock',
          sortable: true,
          width: '110'
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
                          this.show(params.index)
                      }
                  }
              }, 'View'),
              h('Button', {
                  props: {
                      type: 'error',
                      size: 'small'
                  },
                  on: {
                      click: () => {
                          this.remove(params.index)
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
      show (index) {

      },
      remove (index) {

      },
      formatAssetsRes (data) {
        let formatData = []
        data.forEach((item) => {
          formatData.push({
            address: item.uaddr,
            eth: item.ueth,
            eos: item.ueos,
            ethState: item.uethState,
            eosState: item.ueosState,
            ethLock: item.uethLock,
            eosLock: item.ueosLock
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