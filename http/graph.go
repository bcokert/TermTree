package http

import (
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

func CreateHandler(schema *graphql.Schema, useGraphiql bool) *handler.Handler {
	return handler.New(&handler.Config{
		Schema:   schema,
		Pretty:   true,
		GraphiQL: useGraphiql,
	})
}
