import styles from "./styles.module.css";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEye,FaPlus, FaTimes } from 'react-icons/fa';
import { fetchData } from "../../../../services/api.js";
import Header from "../../../../components/Header/index.jsx";
import SelectFilter from "../../components/SelectFilter/index.jsx";
import FilterBar from "../../../../components/FilterBar/index.jsx";
import Pagination from "../../../../components/Pagination/index.jsx";
import { Button } from "../../../../components/Button/index.jsx";
import SearchBar from "../../../../components/SearchBar/index.jsx";

const ViewProducts = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const stockFilters = ["In Stock", "Low Stock", "High Stock"];
    const [stock, setStock] = useState("");
    const [brand, setBrand] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        fetchData("/brands", "GET")
            .then(res => setBrands(res.data.data))
            .catch(err => console.error("Error fetching brands:", err));
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();
        if (brand) params.append("brand", brand);
        if (stock) {
            const firstWord = stock.split(" ")[0];
            params.append("stock", firstWord.toLowerCase());
        }
        if (name) params.append("name", name);
        params.append("page", currentPage);

        const query = `?${params.toString()}`;
        console.log("Fetching products with query:", query);

        fetchData(`/admin/view-products${query}`, "GET")
            .then(res => {
                const responseData = res.data.data || {};
                setProducts(responseData.data || []);
                setLastPage(responseData.last_page || 1);
            })
            .catch(err => console.error("Error fetching products:", err));
    }, [stock, brand, name, currentPage]);

    const handleStockFilterChange = (filter) => {
        setStock(filter);
        setCurrentPage(1);
    };

    const handleSearch = (searchTerm) => {
        setName(searchTerm);
        setCurrentPage(1);
    };

    const columns = [
        { header: 'ID', key: 'id' },
        { header: 'Name', key: 'name' },
        { header: 'Brand', render: (product) => product.brand?.name || "No Brand" },
        { header: 'Category', render: (product) => product.category?.name || "No Category" },
        { header: 'Gender', key: 'gender' },
        { header: 'Price', render: (product) => product.variants?.[0]?.price ?? "N/A" },
        { header: 'Stock', render: (product) => product.variants?.[0]?.stock ?? "N/A" },
        { header: 'Accords', render: (product) => product.accords?.map(a => a.name).join(', ') || "" },
        {
            header: 'Actions',
            render: (product) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <FaEye style={{ cursor: 'pointer' }} title="View" onClick={() => navigate(`/admin-view-product/${product.id}`)} />
                    <FaEdit style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin-update-product/${product.id}`)} />
                    <FaTrash style={{ cursor: 'pointer' }} title="Delete" />
                </div>
            )
        }
    ];

    return (
        <><Header />

            <div className={styles.pageContainer}>
                <div className={styles.pageTitle}>
                    <h1>Admin Products Dashboard</h1>
                </div>

                <div className={styles.filtersSection}>
                    <div className={styles.filtersGroup}>
                        <SearchBar
                            onSearch={handleSearch}
                            placeholder="Search by name..."
                        />

                        <FilterBar
                            filters={stockFilters}
                            activeFilter={stock}
                            onFilterChange={handleStockFilterChange}
                        />

                        <SelectFilter
                            label="Filter by Brand"
                            options={brands}
                            selected={brand}
                            onChange={(val) => {
                                setBrand(val);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    <Button variant="primary" size="medium" label="Add Product" onClick={() => navigate(`/admin-create-products`)} />
                </div>

                <div className={styles.tableWrapper}>
                    <Table columns={columns} data={products} />
                </div>

                <Pagination
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    totalPages={lastPage}  
                />

            </div>
        </>
    );
};

export default ViewProducts;