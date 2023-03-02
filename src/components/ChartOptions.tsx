import { Canvas, Button } from 'datocms-react-ui';
import { useForm } from 'react-hook-form';
import { palettes } from '../lib/constants';
import { getAvailablePalettes } from '../lib/utils';

function ShowPalette({ palette }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px 0' }}>
      {palette.map((p, i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 8,
            margin: 2,
            borderRadius: 10,
            backgroundColor: p,
          }}
        ></div>
      ))}
    </div>
  );
}

function ChartOptions({ config, setConfig, chart, numSeries }) {
  const availabelPalettes = getAvailablePalettes(numSeries);
  const defaultPalette = availabelPalettes[0];
  console.log('defaultValues', config);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...config,
      palette: defaultPalette,
    },
  });

  const watchPalette = watch('palette', defaultPalette);

  const fields = [
    {
      label: 'Chart palette',
      name: 'palette',
      type: 'select',
      options: availabelPalettes,
      otherProps: {},
      required: false,
      chartType: ['bar', 'line', 'pie', 'geo'],
      defaultValue: defaultPalette,
      layout: '',
    },
    {
      label: 'Show Legend',
      name: 'legend',
      type: 'checkbox',

      options: [],
      required: false,
      chartType: ['bar', 'line', 'pie', 'geo'],
      otherProps: { defaultChecked: true },
      layout: '',
    },
    {
      label: 'Show tooltip',
      name: 'tooltip',
      type: 'checkbox',
      options: [],
      required: false,
      chartType: ['bar', 'line', 'pie', 'geo'],
      otherProps: { defaultChecked: true },
      layout: '',
    },
    {
      label: 'valueFormatter',
      name: 'valueFormatter',
      type: 'text',
      options: [],
      required: false,
      chartType: ['bar', 'line', 'pie', 'geo'],
      otherProps: {},
      layout: '',
    },
    {
      label: 'Tooltip format',
      name: 'tooltipFormatter',
      type: 'select',
      options: ['', 'number', 'currency', 'percentage'],
      required: false,
      chartType: ['bar', 'line', 'pie', 'geo'],
      otherProps: {},
      layout: '',
    },
    {
      label: 'Tooltip add value',
      name: 'tooltipAdditionalValue',
      type: 'select',
      options: ['', 'total', 'percentage'],
      required: false,
      chartType: ['bar', 'line', 'pie', 'geo'],
      otherProps: {},
      layout: '',
    },
    {
      label: 'Chart Height',
      name: 'h',
      type: 'number',
      options: [],
      otherProps: {
        step: 10,
      },
      required: false,
      chartType: ['bar', 'line', 'pie', 'geo'],
      layout: '',
    },
    // {
    //   label: 'Chart Width',
    //   name: 'w',
    //   type: 'number',
    //   options: [],
    //   otherProps: {
    //     step: 10,
    //   },
    //   required: false,
    //   chartType: [],
    //   layout: '',
    // },
    {
      label: 'X Axis Name',
      name: 'xLabel',
      type: 'text',
      options: [],
      otherProps: {},
      required: false,
      chartType: ['bar', 'line'],
      layout: '',
    },
    {
      label: 'Y Axis Name',
      name: 'yLabel',
      type: 'text',
      options: [],
      otherProps: {},
      required: false,
      chartType: ['bar', 'line'],
      layout: '',
    },
    {
      label: 'Direction',
      name: 'direction',
      type: 'select',
      options: ['vertical', 'horizontal'],
      otherProps: {},
      required: false,
      placeholder: 'Chart Direction',
      chartType: ['bar'],
      layout: '',
    },
    {
      label: 'Data Zoom',
      name: 'zoom',
      type: 'select',
      options: ['none', 'inside', 'slider'],
      required: false,
      chartType: ['bar', 'line', 'geo'],
      otherProps: {},
    },
    {
      label: 'Smooth Lines',
      name: 'smooth',
      type: 'number',
      options: [],
      required: false,
      chartType: ['line'],
      otherProps: { step: 0.1 },
      layout: '',
    },
    {
      label: 'Stacked',
      name: 'stack',
      type: 'checkbox',
      options: [],
      required: false,
      chartType: ['bar'],
      otherProps: {},
      layout: '',
    },
    {
      label: 'Total Label',
      name: 'totalLabel',
      type: 'text',
      options: [],
      required: false,
      chartType: ['pie'],
      otherProps: {},
      layout: '',
    },
  ];

  const onSubmit = (data) => {
    console.log(data);
    const { h, w, palette, ...rest } = data;
    const colors = palettes[palette];
    console.log(palette, 'colors', colors);
    const newConfig = { h: Number(h), w: Number(w), ...rest, colors };
    console.log('newConfig', newConfig);
    setConfig(newConfig);
  };
  if (!chart) {
    return <div my-10>Please choose a chart type</div>;
  }
  return (
    <div>
      {/* <div>NUMERO SERIE : {numSeries}</div> */}
      {watchPalette && <ShowPalette palette={palettes[watchPalette]} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridGap: 10,
          }}
        >
          {fields
            .filter((field) => field.chartType.includes(chart))
            .map((field) => {
              if (['text', 'email', 'number'].includes(field.type)) {
                let style = {};
                if (field.layout === 'single') {
                  style = { gridColumn: 'span 3' };
                }
                return (
                  <div key={field.name} style={style}>
                    <label>{field.label}</label>
                    <input
                      type={field.type}
                      {...register(field.name, { required: field.required })}
                      {...field.otherProps}
                    />
                    {errors[field.name] && <span>This field is required</span>}
                  </div>
                );
              } else if (['checkbox'].includes(field.type)) {
                let style = {};
                if (field.layout === 'single') {
                  style = { gridColumn: 'span 3' };
                }
                return (
                  <div key={field.name} style={style}>
                    <label>{field.label}</label>
                    <div>
                      <input
                        type="checkbox"
                        {...register(field.name, { required: field.required })}
                        {...field.otherProps}
                      />
                    </div>
                    {errors[field.name] && <span>This field is required</span>}
                  </div>
                );
              } else if (['select'].includes(field.type)) {
                let style = {};
                if (field.layout === 'single') {
                  style = { gridColumn: 'span 3' };
                }
                return (
                  <div key={field.name} style={style}>
                    <div>{field.label}</div>
                    <select
                      {...register(field.name, { required: field.required })}
                      {...field.otherProps}
                    >
                      {field.options.map((option) => {
                        return (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        );
                      })}
                    </select>
                    {errors[field.name] && <span>This field is required</span>}
                  </div>
                );
              } else {
                let style = {};
                if (field.layout === 'single') {
                  style = { gridColumn: 'span 3' };
                }
                return <div style={style}>{field.name}</div>;
              }
            })}
        </div>
        <div className="mt-5">
          <Button fullWidth type="submit">
            Applica
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChartOptions;
