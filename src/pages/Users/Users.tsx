import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import TableThree from "../../components/Tables/TableThree";
import DefaultLayout from "../../layout/DefaultLayout";


const Users = () => {
    return (
        <div>
            <DefaultLayout>
                <Breadcrumb pageName="Users" />
                <TableThree />
            </DefaultLayout>
        </div>
    );
};

export default Users;