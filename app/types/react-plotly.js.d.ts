declare module 'react-plotly.js' {
    import { Component } from 'react';
    import { PlotParams } from 'plotly.js';
  
    interface PlotlyComponentProps extends PlotParams {
      className?: string;
      style?: React.CSSProperties;
      useResizeHandler?: boolean;
      debug?: boolean;
      onInitialized?: (figure: Readonly<PlotParams>, graphDiv: HTMLElement) => void;
      onPurge?: (figure: Readonly<PlotParams>, graphDiv: HTMLElement) => void;
      onError?: (err: Error) => void;
      onUpdate?: (figure: Readonly<PlotParams>, graphDiv: HTMLElement) => void;
      onRelayout?: (figure: Readonly<PlotParams>) => void;
      onRedraw?: () => void;
      onHover?: (event: Readonly<PlotParams>) => void;
      onUnhover?: (event: Readonly<PlotParams>) => void;
      onSelected?: (event: Readonly<PlotParams>) => void;
      onDeselect?: () => void;
    }
  
    class PlotlyComponent extends Component<PlotlyComponentProps> {}
  
    export default PlotlyComponent;
  }
  