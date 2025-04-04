import { useEffect, useState } from 'react';
import {Book} from "../types/Book";
import { useNavigate } from 'react-router-dom';

function BookList({ selectedCategories }: { selectedCategories: string[] }) { 
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const[totalPages, setTotalPages] = useState<number>(0);
    //const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Sorting state
    const navigate = useNavigate();


    useEffect(() => {
            const fetchBooks = async () => {
                const categoryParams = selectedCategories
                .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
                .join('&');

            const response = await fetch(`http://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`);
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(totalItems / pageSize));
        };

        fetchBooks();
    }, [pageSize, pageNum, totalItems]);


    // // Sorting function-------------------------------------------------
    // const sortedBooks = [...books].sort((a, b) => {
    //     if (sortOrder === 'asc') {
    //         return a.title.localeCompare(b.title); // A → Z
    //     } else {
    //         return b.title.localeCompare(a.title); // Z → A
    //     }
    // });

    return (
        <>
            <h1>Books</h1>

            <br />

            {/* Sorting Button -------------------------------------------------------------------------- */} 
            {/* <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
            Sort by Title ({sortOrder === 'asc' ? 'A → Z' : 'Z → A'})
            </button> */}

            <br />
            <br />
            
            {books.map((b) => //--------------------------------sortedBooks now instead of books
                <div id="bookCard" className='card' key={b.bookId}>
                    <h3 className='card-title'>{b.title}</h3>
                    <div className = 'card-body'>
                    <ul className = 'list-unstyled'>
                        <li><strong>Book Author:</strong> {b.author}</li>
                        <li><strong>Book Publisher:</strong> {b.publisher}</li>
                        <li><strong>Book ISBN:</strong> {b.isbn}</li>
                        <li><strong>Book Classification:</strong> {b.classification}</li>
                        <li><strong>Book Category:</strong> {b.category}</li>
                        <li><strong>Book Page Count:</strong>{b.pageCount}</li>
                        <li><strong>Book Price:</strong> {b.price}</li>
                    </ul>

                    <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/price/${b.title}/${b.bookId}`)
              }
            >
              Price
            </button>

                    </div>
                </div>
            )}


            <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

            {[...Array(totalPages)].map((_, i) => (
                    <button key={i + 1} disabled={pageNum === (i + 1)} onClick={() => setPageNum(i + 1) }>
                        {i + 1}
                    </button>
            ))}

            <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

            <br />
            <label>
                Results per page: 
                <select value={pageSize} 
                onChange={(b) => {
                    setPageSize(Number(b.target.value));
                    setPageNum(1);
                }}>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='20'>20</option>
                </select>
            </label>
        </>
    );
}

export default BookList;