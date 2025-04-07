import { useEffect, useState } from 'react';
import { Book } from "../types/Book";
import { useNavigate } from 'react-router-dom';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            const categoryParams = selectedCategories
                .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
                .join('&');

            const response = await fetch(`http://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`);
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // ✅ Fix: use `data.totalNumBooks` directly
        };

        fetchBooks();
    }, [pageSize, pageNum, selectedCategories]);

    return (
        // ✅ Bootstrap container for padding and alignment
        <div className="container my-4">
            <h1 className="mb-4">All of Our Books</h1>

            {/* ✅ Bootstrap grid system: responsive rows and columns */}
            <div className="row">
                {books.map((b) => (
                    // ✅ Each card in a responsive column
                    <div className="col-md-6 col-lg-4 mb-4" key={b.bookId}>
                        {/* ✅ Bootstrap card with shadow and full-height layout */}
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{b.title}</h5>

                                {/* ✅ Consistent list styling using Bootstrap list utilities */}
                                <ul className="list-unstyled mb-3">
                                    <li><strong>Author:</strong> {b.author}</li>
                                    <li><strong>Publisher:</strong> {b.publisher}</li>
                                    <li><strong>ISBN:</strong> {b.isbn}</li>
                                    <li><strong>Classification:</strong> {b.classification}</li>
                                    <li><strong>Category:</strong> {b.category}</li>
                                    <li><strong>Page Count:</strong> {b.pageCount}</li>
                                    <li><strong>Price:</strong> ${b.price}</li>
                                </ul>

                                {/* ✅ Styled button using Bootstrap */}
                                <button
                                    className="btn btn-success mt-auto" // `mt-auto` pushes it to bottom of flex column
                                    onClick={() =>
                                        navigate(`/donate/${b.title}/${b.price}/${b.bookId}`)
                                    }
                                >
                                    Buy
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ✅ Bootstrap-styled pagination */}
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setPageNum(pageNum - 1)}>Previous</button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                        <li key={i} className={`page-item ${pageNum === i + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => setPageNum(i + 1)}>{i + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setPageNum(pageNum + 1)}>Next</button>
                    </li>
                </ul>
            </nav>

            {/* ✅ Results-per-page selector styled with Bootstrap form utilities */}
            <div className="mt-3">
                <label className="form-label me-2">Results per page:</label>
                <select
                    className="form-select w-auto d-inline" // `w-auto` makes dropdown compact
                    value={pageSize}
                    onChange={(b) => {
                        setPageSize(Number(b.target.value));
                        setPageNum(1);
                    }}
                >
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='20'>20</option>
                </select>
            </div>
        </div>
    );
}

export default BookList;
