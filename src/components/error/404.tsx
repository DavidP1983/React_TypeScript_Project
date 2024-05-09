import img from './404.jpg';

const Page404NotFound = () => {
    return (
        <img src={img} alt="error" style={{display: "block", width: '350px', height:'250px', objectFit:'contain', margin: '0 auto'}}/>
    );
}

export default Page404NotFound;