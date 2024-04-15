import React, {
  Fragment,
  useEffect,
  useState,
} from "react";
import { CATEGORIES } from "../../constants/categories.constant";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { PRODUCTS } from "../../../public/data/data";
import Loader from "../../components/Loader/Loader";

const INITIAL_PRODUCTS = PRODUCTS;

const Shop = () => {
  const [openAccordion, setOpenAccordion] = useState(1);
  const [sort, setSort] = useState(null);
  const [filter, setFilter] = useState([]);
  const [products, setProducts] = useState(
    INITIAL_PRODUCTS
  );
  const [searchString, setSearchString] = useState("");
  const [indexLoadMore, setIndexLoadMore] = useState(1);
  const [limitProducts, setLimitProducts] = useState(
    INITIAL_PRODUCTS.slice(0, 6)
  );
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.size >= 1) {
      searchParams.forEach((value, key) => {
        if (key === "search") {
          setSearchString(value);
        } else {
          setFilter(value.split(",").map((id) => +id));
        }
      });
    } else {
      setSearchString("");
      setFilter([]);
    }
  }, [searchParams]);

  useEffect(() => {
    handleApplyFilter();
  }, [filter.length, sort, indexLoadMore, searchString]);

  const handleAccordionClick = (accordionNumber) => {
    setOpenAccordion(
      accordionNumber === openAccordion
        ? null
        : accordionNumber
    );
  };

  const handleCollectFilter = (filterID) => {
    if (filter.includes(filterID)) {
      setFilter((prev) => {
        const newFilter = prev.filter((item) => {
          return item != filterID;
        });
        if (newFilter.length > 0) {
          setSearchParams((searchParams) => {
            const prevParams = {};
            searchParams.forEach((value, key) => {
              prevParams[key] =
                key === "search"
                  ? value
                  : newFilter.join(",");
            });
            return { ...prevParams };
          });
        } else {
          setSearchParams((searchParams) => {
            searchParams.delete("category");
            return searchParams;
          });
        }
        return newFilter;
      });
    } else {
      setFilter((prev) => {
        const newFilter = [...prev, filterID];
        setSearchParams((searchParams) => {
          const prevParams = {};
          searchParams.forEach((value, key) => {
            prevParams[key] =
              key === "search"
                ? value
                : newFilter.join(",");
          });
          if (newFilter.length === 1) {
            return {
              ...prevParams,
              category: newFilter.join(","),
            };
          }
          return { ...prevParams };
        });
        return newFilter;
      });
    }
  };

  const handleApplyFilter = () => {
    let productsApplyFilter = INITIAL_PRODUCTS;
    if (searchString !== "") {
      productsApplyFilter = INITIAL_PRODUCTS.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(searchString.toLowerCase())
      );
    }
    productsApplyFilter = productsApplyFilter.filter(
      (product) => {
        if (filter.length === 0) {
          return true;
        } else {
          if (filter.includes(product.categories)) {
            return true;
          }
          return false;
        }
      }
    );
    if (sort !== null) {
      productsApplyFilter = sortProducts(
        productsApplyFilter
      );
    }
    setProducts(productsApplyFilter);
    setLimitProducts(
      productsApplyFilter.slice(0, 6 * indexLoadMore)
    );
  };

  const handleSortCheapest = () => {
    setSort("Cheapest");
  };

  const handleSortHighest = () => {
    setSort("Highest");
  };

  const handleShowMore = () => {
    setIndexLoadMore((prev) => prev + 1);
  };

  const sortProducts = (listProducts) => {
    if (sort === "Cheapest") {
      listProducts = listProducts.sort(
        (a, b) => a.price - b.price
      );
    } else {
      listProducts = listProducts.sort(
        (a, b) => b.price - a.price
      );
    }
    return listProducts;
  };

  return (
    <Fragment>
      <Loader />
      <div className="shop-bg-filter w-100 position-fixed top-0" />
      <section className="container mb-5">
        <hr />
        <div className="shop-container">
          <div className="row">
            <div className="col-12 rounded-4 col-lg-4 d-lg-block filter-menu-container overflow-y-auto">
              <div className="shop-filter border border-1 px-4 py-2 rounded-4 bg-white">
                <div className="d-flex align-items-center py-2 border-bottom my-3">
                  <div className="flex-grow-1">
                    <h1 className="fs-5 fw-bold">Filter</h1>
                  </div>
                  <div>
                    <i className="fs-5 bi bi-sliders2-vertical d-none d-lg-block" />
                    <button className="btn close-filter-mnu d-block d-lg-none">
                      <i className="fs-5 bi bi-x-lg close-filter-mnu" />
                    </button>
                  </div>
                </div>
                <div className="category my-3 py-2 border-bottom">
                  <div
                    className="accordion"
                    id="accordionExample"
                  >
                    {CATEGORIES.map((category) => (
                      <div
                        className="accordion-item"
                        key={category.id}
                      >
                        <h2
                          className="accordion-header"
                          id="headingTwo"
                        >
                          <button
                            className={`accordion-button ${
                              openAccordion === category.id
                                ? ""
                                : "collapsed"
                            }`}
                            type="button"
                            onClick={() =>
                              handleAccordionClick(
                                category.id
                              )
                            }
                            aria-expanded={
                              openAccordion === category.id
                                ? "true"
                                : "false"
                            }
                          >
                            {category.name}
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          className={`accordion-collapse collapse ${
                            openAccordion === category.id
                              ? "show"
                              : ""
                          }`}
                          aria-labelledby="headingTwo"
                        >
                          <div className="accordion-body">
                            {category.children.map(
                              (child) => (
                                <div
                                  className="form-check"
                                  key={child.id}
                                >
                                  <input
                                    className="form-check-input pointer-cursor"
                                    type="checkbox"
                                    id={child.id}
                                    checked={filter.includes(
                                      child.id
                                    )}
                                    onClick={() =>
                                      handleCollectFilter(
                                        child.id
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label ml-3"
                                    htmlFor={child.id}
                                  >
                                    {child.name}
                                  </label>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <div className="shop-header d-flex my-4">
                <div className="d-flex align-items-center">
                  <div className="text-secondary">
                    {`Showing 1-${6 * indexLoadMore} of ${
                      products.length
                    } products`}
                  </div>
                  <div className="text-secondary mx-2 d-none d-lg-block">
                    Sort by:
                  </div>
                  <div className="position-relative sort-menu d-none d-lg-block">
                    <a className="text-decoration-none text-black pointer-cursor">
                      {sort === null ? "Select Sort" : sort}
                      <i className="bi bi-chevron-down" />
                    </a>
                    <div className="shadow bg-white d-block py-2 px-2 rounded-2 position-absolute">
                      <a
                        className="d-block my-1 text-decoration-none text-black"
                        onClick={handleSortCheapest}
                      >
                        Cheapest
                      </a>
                      <a
                        className="d-block my-1 text-decoration-none text-black"
                        onClick={handleSortHighest}
                      >
                        Highest
                      </a>
                    </div>
                  </div>
                  <div>
                    <button className="toggle-filter-menu d-block d-lg-none mx-1 btn bg-alternative text-black rounded-circle d-flex justify-content-center align-items-center">
                      <i className="toggle-filter-menu bi bi-sliders2-vertical fs-6" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="shop-products py-2">
                <div className="row align-items-stretch">
                  {limitProducts.map((product) => (
                    <div
                      className="col-6 col-md-4 py-1 px-2 my-4 position-relative "
                      key={product.id}
                      onClick={() =>
                        navigate(
                          `/product-details/${product.id}`,
                          {
                            state: product,
                          }
                        )
                      }
                    >
                      <div className="shop-item h-100 pointer-cursor">
                        <div className="product-container bg-transparent h-75 p-2 rounded-3">
                          <span className="text-black text-decoration-none">
                            <img
                              loading="lazy"
                              src={product.image1}
                              alt="product"
                              className="w-100 h-100 rounded-4 object-fit-cover"
                            />
                            <h6 className="mt-3">
                              {product.name}
                            </h6>
                            <div className="d-flex px-1 position-absolute bottom-0">
                              <div
                                className="mx-1 fw-bold"
                                data-item-type="price"
                              >
                                {`${product.price}$`}
                              </div>
                              <div className="mx-1">
                                <strike>
                                  {Math.round(
                                    product.price /
                                      (1 -
                                        product.percentSalesOff)
                                  ) + "$"}
                                </strike>
                              </div>
                              <div className="mx-1">
                                <span className="bg-danger-subtle rounded-pill px-2 py-1">
                                  {Math.round(
                                    product.percentSalesOff *
                                      100
                                  ) + "%"}
                                </span>
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {indexLoadMore <
                Math.round(products.length / 6) && (
                <div className="w-100 text-center my-5">
                  <div className="row justify-content-center">
                    <div
                      className="col-12 col-lg-3"
                      onClick={handleShowMore}
                    >
                      <a className="btn py-2 px-4 rounded-pill border border-1 w-100">
                        Show more
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Shop;
