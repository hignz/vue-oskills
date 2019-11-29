<template>
  <div class="example">
    <apexchart
      width="100%"
      type="radialBar"
      :size="size"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts
  },
  props: {
    seriesName: {
      type: String,
      required: true
    },
    seriesData: {
      type: Array,
      required: true
    },
    size: {
      type: Number,
      default: () => 200
    }
  },
  computed: {
    ...mapGetters(['isDark', 'accentColor']),
    chartOptions() {
      return {
        chart: {
          background: this.isDark ? '#424242' : '#ffffff'
        },
        theme: {
          mode: this.isDark ? 'dark' : 'light'
        },
        plotOptions: {
          radialBar: {
            size: this.size,
            dataLabels: {
              name: {
                fontSize: '20px'
              },
              value: {
                show: true,
                fontSize: '20px',
                formatter: function(val) {
                  return val.toFixed(2);
                }
              }
            }
          }
        }
      };
    },
    series() {
      return this.seriesData;
    }
  }
};
</script>

<style></style>
