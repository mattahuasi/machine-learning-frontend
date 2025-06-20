<script setup>
import { ref, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  title: {
    type: String,
    default: "Pie chart title",
  },
  chartName: {
    type: String,
    default: "Pie chart name",
  },
  chartData: {
    type: Array,
    required: true,
  },
  load: {
    type: Boolean,
    default: false,
  },
});
const pie = ref(null);

watch(
  () => props.load,
  (load) => {
    if (pie.value !== null) {
      const echart = echarts.init(pie.value);
      echart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: props.chartName,
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: props.chartData,
          },
        ],
      });
    }
  }
);
</script>

<template>
  <div
    class="flex flex-wrap items-center px-5 min-w-0 mb-4 lg:my-4 py-6 break-words bg-white rounded-md shadow-sm"
  >
    <h2 class="text-gray-700 text-xl font-semibold">
      {{ title }}
    </h2>
    <div ref="pie" class="w-full h-72 mx-auto"></div>
  </div>
</template>
