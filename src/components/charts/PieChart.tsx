import ReactEcharts from 'echarts-for-react';
import { FieldDataType } from '../../sharedTypes';

type ChartPropsType = {
  data: FieldDataType;
};

function getTotal(data: any) {
  return data.reduce((acc, v) => {
    return acc + Number(v.value);
  }, 0);
}

function PieChart({ data }: ChartPropsType) {
  const { dataSource } = data;
  const config: any = data.config;

  const tooltip = {
    trigger: config.tooltipTrigger || 'item',
    axisPointer: {
      type: config.axisPointer,
    },
    valueFormatter: (value) => {
      const formatter = config.tooltipFormatter;
      const valueFormatter = config.valueFormatter;
      let valueFormatted = value;
      if (formatter) {
        if (formatter === 'percentage') {
          valueFormatted = `${value}%`;
        } else if (formatter === 'currency') {
          valueFormatted = new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR',
          }).format(value);
        } else if (formatter === 'number') {
          valueFormatted = new Intl.NumberFormat('it-IT', {
            style: 'decimal',
          }).format(value);
        }
      }
      return `${valueFormatted} ${valueFormatter ? valueFormatter : ''}`;
    },
    show: config.tooltip,
    // formatter: (params: any) => {},
  };

  console.log('dataSource', dataSource);
  let total = 0;
  try {
    const serie: any = dataSource.series;
    let serieData: any;
    if (typeof serie === 'object' && !Array.isArray(serie)) {
      serieData = serie.data;
    } else if (Array.isArray(serie)) {
      serieData = serie[0].data;
    }
    total = getTotal(serieData);
  } catch (error) {}

  const options = {
    title: {
      text: `${config?.totalLabel || 'Total'}\n${total} ${
        config.valueFormatter || ''
      }`,
      left: 'center',
      top: 'center',
    },
    color: config.colors,
    series: dataSource.series,
    textStyle: {
      fontWeight: '600',
      fontSize: 14,
    },
    tooltip,
    legend: {
      left: 'center',
      top: 'bottom',
      show: config.legend,
    },
  };
  return (
    <ReactEcharts
      option={options}
      style={{
        width: config.w,
        height: config.h,
        maxWidth: '100%',
      }}
    />
  );
}

export default PieChart;
