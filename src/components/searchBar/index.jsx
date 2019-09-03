import React from 'react'
import { TitleBar, Toolbar, SearchField } from 'react-desktop/macOs';

export default function SearchBar() {


    const handleChange  = e => console.log(e.target.value);

    return (
        <TitleBar inset>
        <Toolbar height="43" horizontalAlignment="right">
          <SearchField
            placeholder="Search"
            defaultValue=""
            onChange={handleChange}
          />
          
        </Toolbar>
      </TitleBar>
    )
}
