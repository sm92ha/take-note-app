import React from 'react'
import { TitleBar, Toolbar, SearchField } from 'react-desktop/macOs';

export default function SearchBar(props) {


    const handleChange  = e => props.search(e.target.value);
    const handleCancel  = () => props.search("");

    return (
        <TitleBar inset>
        <Toolbar height="43" horizontalAlignment="right">
          <SearchField
            placeholder="Search"
            defaultValue=""
            onChange={handleChange}
            onCancel={handleCancel}
          />
          
        </Toolbar>
      </TitleBar>
    )
}
