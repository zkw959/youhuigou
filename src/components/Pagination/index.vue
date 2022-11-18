<template>
  <div class="pagination">
    <template v-if="this.pageInfo.totalCount > 0">
      <!-- 顶部 -->
      <button :disabled="pageInfo.pageNo === 1" @click="$emit('getPageNo',pageInfo.pageNo-1)">上一页</button>
      <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)">1</button>
      <button v-if="startNumAndEndNum.start > 2">···</button>

      <!-- 中部 -->
      <template v-for="(page,index) in startNumAndEndNum.end">
        <button v-if="page>=startNumAndEndNum.start" :key="index" @click="$emit('getPageNo',page)" :class="{active: pageInfo.pageNo === page}">
          {{page}}  
        </button>
      </template>
      
      <!-- 尾部 -->
      <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
      <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)">{{totalPage}}</button>
      <button :disabled="pageInfo.pageNo === totalPage" @click="$emit('getPageNo',pageInfo.pageNo+1)">下一页</button>
      <button style="margin-left: 30px">共 {{pageInfo.totalCount}} 条</button>
    </template>
    <template v-else> 
      <h3>没有搜索到如何数据</h3>
      <br>
    </template>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:["pageInfo"],
    computed:{
      // 总页码
      totalPage(){
        return Math.ceil(this.pageInfo.totalCount / this.pageInfo.pageSize)
      },
      // 计算连续页码的起始数字与结束数字
      startNumAndEndNum(){
        const {pageNo,continues} = this.pageInfo
        const {totalPage} = this
        // 定义两个变量存储起始数字与结束数字
        let start = 0, end = 0
        
        if(totalPage < continues){
          // 总页码小于连续页码
          start = 1
          end = totalPage
        }else{
          // 总页码大于连续页码
          start = pageNo - parseInt(continues / 2)
          end = pageNo + parseInt(continues / 2)

          // 处理头部页码越界
          if(start < 1){
            start = 1
            end = continues
          }
          //  处理尾部页码越界
          if(end > totalPage){
            start = totalPage - (continues - 1)
            end = totalPage
          }
        }
        return {start, end}
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>