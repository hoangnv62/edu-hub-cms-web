import { RootStyle } from './styles';

export default function LoaderWithLogo() {
  return (
    <RootStyle>
      <div className="logo">
        <img src="/static/logo/logo.png" alt="logo" width={90} height={90} />
      </div>
      <div className="loading-content" />
    </RootStyle>
  );
}
