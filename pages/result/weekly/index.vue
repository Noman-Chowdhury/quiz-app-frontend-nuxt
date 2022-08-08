<template>
  <div>
    <vue-good-table
      :columns="columns"
      mode="remote"
      :pagination-options="{
        enabled: true,
      }"
      :line-numbers="true"
      style-class="vgt-table striped bordered condensed body-2"
      :rows="rows"
      @on-row-click="onRowHover"
      @on-cell-click="onRowClick">
      <template
        slot="table-row"
        slot-scope="props"
      >
        <span v-if="props.column.field === 'total_marks'">
         {{props.row.marks_got}} / {{props.row.total_marks}}
        </span>
        <span v-else-if="props.column.field === 'total_ques'">
         {{props.row.answered}} / {{props.row.total_questions}}
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
export default {
  name: 'WeeklyResult',
  data(){
    return {
      columns: [
        {
          label: 'Week',
          field: 'name',
        },
        {
          label: 'Answered Question',
          field: 'total_ques',
        },
        {
          label: 'Marks',
          field: 'total_marks',
        },
        {
          label: 'Status',
          field: 'status',
        },
      ],
    };
  },
  computed:{
    rows(){
      return this.$store.getters["user/result/previousResults"]
    }
  },
  mounted() {
  this.getResult()
    },
  methods: {
    getResult() {
      this.$store.dispatch('user/result/getPreviousResults')
    },
    onRowHover() {
    //
    },
    onRowClick(params) {
      // this.$router.push({name:'result-weekly', params:{slug:params.row.id}})
      this.$router.push(`/result/weekly/${params.row.id}`)
      // console.log(this.$route.params)
    },
  },
};
</script>
