package graph

import (
	"fmt"

	"github.com/graphql-go/graphql"
)

type Term struct {
	id    string
	name  string
	value string
	terms []string
}

func CreateTermSchema() (*graphql.Schema, error) {
	terms := map[string]Term{
		"entropy": Term{
			id:    "entropy",
			name:  "Entropy",
			value: "Entropy represents the possible {{term:kinetic_state}} of a {{term:system_of_particles}}. A larger Entropy means there are more possible states the {{term: system_of_particles}} could be in. Entropy is measured from an arbitrary origin value; thus entropies can only be compared if they have the same origin value.",
			terms: []string{"kinetic_state", "system_of_particles"},
		},
		"kinetic_state": Term{
			id:    "kinetic_state",
			name:  "Kinetic State",
			value: "The Kinetic State, or often just state, of a {{term:particle}} is the current configuration of its position and velocity in space. In 3 dimensional space, there are thus 6 fields in a {{term:particle;display:particles}} state (x, y, z, Vx, Vy, Vz). A particle can be in one of many different states, collectively called its possible kinetic states. The kinetic state of a {{term:system_of_particles}} is the configuration of the kinetic states of each of its {{term:particle;display:particles}}. If {{term:particle;display:particles}} have M kinetic states, and there are N {{term:particle;display:particles}}, then there are almost M^N possible kinetic states (they cannot share the same x,y,z position).",
			terms: []string{"particle", "system_of_particles"},
		},
		"particle": Term{
			id:    "particle",
			name:  "Particle",
			value: "A particle is a physical entity that occupies space and has a {{term:kinetic_state}}. According to the dominant interpretation of quantum mechanics, it actually has just a probability of being in various states, and only takes on the single state when it is measured.",
			terms: []string{"kinetic_state"},
		},
		"system_of_particles": Term{
			id:    "system_of_particles",
			name:  "System of Particles",
			value: "A System of Particles is a collection of {{term:particle;display:particles}}. The {{term:particle;display:particles}} have independent {{term:kinetic_state;display:kinetic states}}, but cannot occupy the exact same position in space. The more {{term:kinetic_state;display:kinetic states}} a system of particles can take on, the larger its {{term:entropy}}.",
			terms: []string{"particle", "kinetic_state", "entropy"},
		},
	}

	term := graphql.NewObject(graphql.ObjectConfig{
		Name:        "Term",
		Description: "A term in the graph",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type:        graphql.ID,
				Description: "The id of the term",
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					if term, ok := p.Source.(Term); ok {
						return term.id, nil
					}
					return nil, nil
				},
			},
			"name": &graphql.Field{
				Type:        graphql.String,
				Description: "The human recognizable name of this term",
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					if term, ok := p.Source.(Term); ok {
						return term.name, nil
					}
					return nil, nil
				},
			},
			"value": &graphql.Field{
				Type:        graphql.String,
				Description: "The interpolable value of this term, which contains templates for nested terms",
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					if term, ok := p.Source.(Term); ok {
						return term.value, nil
					}
					return nil, nil
				},
			},
		},
	})
	term.AddFieldConfig("terms", &graphql.Field{
		Type:        graphql.NewList(term),
		Description: "The terms linked to this term",
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			if term, ok := p.Source.(Term); ok {
				resultTerms := make([]Term, 0, len(term.terms))
				for _, id := range term.terms {
					resultTerms = append(resultTerms, terms[id])
				}
				return resultTerms, nil
			}
			return []interface{}{}, nil
		},
	})

	query := graphql.NewObject(graphql.ObjectConfig{
		Name: "TermQuery",
		Fields: graphql.Fields{
			"term": &graphql.Field{
				Type: term,
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Description: "The id of the term you are after",
						Type:        graphql.String,
					},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					id, _ := p.Args["id"].(string)
					if id == "" {
						return nil, fmt.Errorf("id is required")
					}
					term, _ := terms[id]
					return term, nil
				},
			},
		},
	})

	schemaConfig := graphql.SchemaConfig{Query: query}
	schema, err := graphql.NewSchema(schemaConfig)
	if err != nil {
		return nil, fmt.Errorf("Failed to create graph schema: %v", err)
	}

	return &schema, nil
}
