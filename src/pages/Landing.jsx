import { Logo } from '../components';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>

      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby readymade knausgaard kombucha, subway tile XOXO hot chicken
            jianbing keffiyeh la croix praxis offal gluten-free snackwave.
            Single-origin coffee humblebrag hot chicken fam etsy locavore,
            kickstarter leggings actually letterpress austin keytar photo booth
            same.
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>

        <img src={main} alt='img main' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
