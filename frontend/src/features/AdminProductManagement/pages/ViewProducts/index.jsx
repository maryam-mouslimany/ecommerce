import styles from "./styles.module.css";
import Table from "../../components/Table";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { fetchData } from "../../../../services/api.js";

const ViewProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData("/admin/view-products", "GET")
            .then((res) => {
                setProducts(res.data.data.data); 
            })
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

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