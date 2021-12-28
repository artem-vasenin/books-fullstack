import classes from '../styles/error.module.scss';
import MainLayout from "../components/layouts/main.layout";

const ErrorPage = () => {
    return (
        <MainLayout>
            <h1 className={classes.errorTitle}>Not found</h1>
        </MainLayout>
    );
};

export default ErrorPage;