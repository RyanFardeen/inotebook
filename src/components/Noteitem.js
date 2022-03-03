import React from 'react'

const Noteitem = (props) => {
    const {note} = props; 
    return (
        <div className='col-md-3'>
            <div class="card my-3">
                <div class="card-body">
                    <h5 class="card-title">{note.title}</h5>
                    <p class="card-text">{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam odio fugit iusto harum cupiditate nostrum ad blanditiis fuga tempore laboriosam itaque animi corporis, rem earum omnis officia, nesciunt sunt rerum, fugiat nobis quasi non.</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem