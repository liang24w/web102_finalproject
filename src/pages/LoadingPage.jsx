import React, { useState, useEffect } from 'react';
import { supabase } from '../client'
import { Link, useParams } from 'react-router-dom';

const LoadingPage = () =>  {

    return (
        <div>
            <img src="https://assets-staging.ts4quiz.com/shared/plumbob.gif" className="logo"/>
            <p>Loading...</p>
        </div>
    )
}

export default LoadingPage;