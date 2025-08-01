import Table from "../../components/Table";
import products from '../../../../data/products.json';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import styles from "./styles.module.css";

const ViewProducts = () => {
    const columns = [
        { header: 'ID', key: 'id' },
        { header: 'Name', key: 'name' },
        { header: 'Brand', render: (product) => product.brand.name },
        { header: 'Category', render: (product) => product.category.name },
        { header: 'Gender', key: 'gender' },
        { header: 'Price', render: (product) => product.variants[0].price },
        { header: 'Stock', render: (product) => product.variants[0].stock },
        { header: 'Accords', render: (product) => product.accords.map((a) => a.name).join(', ') },
        {
            header: 'Actions',
            render: (product) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <FaEye style={{ cursor: 'pointer' }} title="View" />
                    <FaEdit style={{ cursor: 'pointer' }} />
                    <FaTrash style={{ cursor: 'pointer' }} title="Delete" />
                </div>
            ),
        },

    ];

    return (<div className={styles.pageContainer}>
        <div className={styles.tableWrapper}>
            <Table columns={columns} data={products} />
        </div>
    </div>);
};

export default ViewProducts;
