import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const globalApi = createApi({
        reducerPath: 'globalApi',
        baseQuery: fetchBaseQuery(
            {baseUrl: 'http://clickinder.com/'}),
        tagTypes: ['globalApi', 'pWebsiteTable'],
        endpoints: (build) => ({

            getProfile: build.mutation({
                query: () => ({
                    url: `api/site/user`,
                    method: 'GET',
                }),
            }),
            getPWebsiteTable: build.query({
                query: ({domain, page}) => ({
                    url: `api/site/publisher/sites`,
                    method: 'GET',
                    params: {
                        domain: domain,
                        limit: 20,
                        offset: page === 1 ? 0 : ((page * 20) - 20)
                    }
                }),
                providesTags: ['pWebsiteTable']
            }),
            getPReportsTable: build.query({
                query: ({domain, page, date}) => {
                    const params = date ? {
                        domain: domain,
                        limit: 20,
                        offset: page === 1 ? 0 : ((page * 20) - 20),
                        date: date
                    } : {
                        domain: domain,
                        limit: 20,
                        offset: page === 1 ? 0 : ((page * 20) - 20),
                    }
                    return {
                        url: `api/site/publisher/reports`,
                        method: 'GET',
                        params: params
                    }
                },
                // providesTags: ['pWebsiteTable']
            }),
            getAReportsTable: build.query({
                query: ({domain, page, date}) => {
                    const params = date ? {
                        campaignName: domain,
                        limit: 20,
                        offset: page === 1 ? 0 : ((page * 20) - 20),
                        date: date
                    } : {
                        campaignName: domain,
                        limit: 20,
                        offset: page === 1 ? 0 : ((page * 20) - 20),
                    }
                    return {
                        url: `api/site/advertiser/reports`,
                        method: 'GET',
                        params: params
                    }
                },
                // providesTags: ['pWebsiteTable']
            }),
            addedPWebsite: build.mutation({
                query: (domain) => ({
                    url: `api/site/publisher/sites`,
                    method: 'POST',
                    body: {domain: domain}
                }),
                invalidatesTags: (res, error, erg) => error ? [] : ['pWebsiteTable']
            }),
            removePWebsite: build.mutation({
                query: (id) => ({
                    url: `api/site/publisher/sites/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: (res, error, erg) => error ? [] : ['pWebsiteTable']
            }),
        }),
    }
)

export const {
    useGetProfileMutation,
    useRemovePWebsiteMutation,
    useAddedPWebsiteMutation,
    useGetPWebsiteTableQuery,
    useGetPReportsTableQuery,
    useGetAReportsTableQuery,
} = globalApi;
