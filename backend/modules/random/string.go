package modules

import (
	"math/rand"
	"time"
)

func RandomString(length int) string {
	rand.Seed(time.Now().UnixNano())
	characters := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

	var result string

	for i := 0; i < length; i++ {
		index := rand.Intn(len(characters))

		result += string(characters[index])
	}

	return result
}
