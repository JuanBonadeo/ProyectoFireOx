import '../Hero1/hero1.css'
import Carousel from 'react-bootstrap/Carousel';
import Button from '../Button/Button';


const Hero1 = () => {
  return (
    <Carousel interval={5000}>
      <Carousel.Item className='Hero1Container'>
        <img
          className="imgHero1"
          src='https://firebasestorage.googleapis.com/v0/b/fireox-eb715.appspot.com/o/CBT1.png?alt=media&token=60514855-2b99-4436-a1b4-ffd193aaf3ce'
          alt="First-slide"
        />
        <Carousel.Caption className='HeroCaption hero12'>
          <Button label='Comprar' to='/productos' />
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className='Hero1Container'>
        <img
          className="imgHero1 imgHero3"
          src='https://firebasestorage.googleapis.com/v0/b/fireox-eb715.appspot.com/o/Todos%20los%20productos.png?alt=media&token=96e08b96-b498-4164-a793-ebdd11539bed'
          alt="Third-slide"
        />
      </Carousel.Item>
      <Carousel.Item className='Hero1Container'>
        <img
          className="imgHero1 imgHero3"
          src='https://firebasestorage.googleapis.com/v0/b/fireox-eb715.appspot.com/o/Envio.png?alt=media&token=950ef1bb-9ed3-4d8f-b361-2e5cbd6afb15'
          alt="Third-slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}
export default Hero1