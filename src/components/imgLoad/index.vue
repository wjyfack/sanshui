<template>
  <div class="imgLists" >
    <ul class="el-upload-list el-upload-list--picture-card">
      <li v-for="(item, index) in commandPhotoList" :key="index" class="el-upload-list__item is-success">
        <img :src="imgshow+item" alt="" class="el-upload-list__item-thumbnail">
        <i class="el-icon-close"/>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="hasHandlePreview(imgshow+item)">
            <i class="el-icon-zoom-in"/>
          </span>
          <span class="el-upload-list__item-delete" @click="hasHandelDelete(index)">
            <i class="el-icon-delete"/>
          </span>
        </span>
      </li>
    </ul>
    <el-upload
      :on-success="handleSuccess"
      :action="imgurl"
      :before-upload="beforeUpload"
      :on-exceed="exceedLimit"
      :show-file-list="false"
      class="avatar-uploader">
      <i class="el-icon-plus avatar-uploader-icon"/>
    </el-upload>
  </div>
</template>
<script>
import { toViewer } from '@/utils/common'
export default {
  props: {
    imgurl: {
      type: String,
      default: ''
    },
    imgshow: {
      type: String,
      default: ''
    },
    list: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      commandPhotoList: []
    }
  },
  watch: {
    list: function(val) {
      this.changeD()
    }
  },
  mounted() {
    this.changeD()
  },
  methods: {
    changeD() {
      this.commandPhotoList = this.list ? this.list.split(',').map(item => {
        const spl = item.split('/')
        return spl[spl.length - 1]
      }) : []
    },
    getImg(event) {
      console.log(event)
    },
    hasHandlePreview(url) {
      toViewer(url)
    },
    handleSuccess(response, file, fileList) {
      // console.log(response)
      const returnData = response.returnData
      console.log(returnData)
      this.commandPhotoList = [...this.commandPhotoList, returnData]
      this.send()
    },
    hasHandelDelete(index) {
      this.commandPhotoList.splice(index, 1)
      // console.log(this.commandPhotoList, index)
      this.send()
    },
    beforeUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      // console.log(isJPG)
      if (!isJPG) {
        this.$message.error('上传只能是图片格式!')
      }
      return isJPG
    },
    exceedLimit(files, fileList) {
      this.$message.error('文件超出个数限')
    },
    send() {
      this.$emit('sendimg', this.commandPhotoList.join(','))
    }
  }
}
</script>

<style lang="scss" scoped>
.imgLists {
  padding-top: 15px;
    display: flex;
    .imglist {
      display: flex;
      .imgitem {
        width: 200px;
        height: 200px;
        margin-right: 15px;
      }
    }
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 146px;
  height: 146px;
  box-sizing: border-box;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 146px;
  height: 146px;
  line-height: 146px;
  text-align: center;
}
.avatar {
  width: 146px;
  height: 146px;
  display: block;
}
</style>
