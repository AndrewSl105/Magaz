// material
import { styled } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
// components
import Page from '../components/Page';
import { CarouselAnimation, CarouselCenterMode } from 'src/components/carousel';
import Space from 'src/components/Space';
import Users from './users';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%',
  paddingTop: '7rem',
  maxWidth: '1080px',
  margin: '0 auto'
});

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle title="The starting point for your next project | Minimal-UI" id="move_top">
      <Card>
          <CardHeader title="Carousel Animation" />
          <CardContent>
            <CarouselAnimation />
          </CardContent>
      </Card>
      <Space value='2' />
      <Card>
          <CardHeader title="Carousel Center Mode" />
          <CardContent>
              <CarouselCenterMode />
          </CardContent>
      </Card>
      <Space value='2' />
      <Card>
          <CardHeader title="Carousel Animation" />
          <CardContent>
            <CarouselAnimation />
          </CardContent>
      </Card>
      <Card>
          <CardHeader title="Carousel Animation" />
          <CardContent>
            <Users />
          </CardContent>
      </Card>
    </RootStyle>
  );
}
