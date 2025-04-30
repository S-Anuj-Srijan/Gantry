declare module 'react-dots-loader' {
    import { ComponentType } from 'react';
  
    interface LoaderProps {
      visible?: boolean;
      color?: string;
      size?: number;
    }
  
    const Loader: ComponentType<LoaderProps>;
  
    export default Loader;
  }