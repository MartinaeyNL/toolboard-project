package storage

import (
	"io/fs"
	"os"
	"path/filepath"
	"strings"
)

func GetWidgetFolders() ([]string, error) {
	var paths []string

	folderPath, err := os.Getwd()
	if err != nil {
		return nil, err
	}
	return append(paths, folderPath, GetToolboardFolderPath()+"\\widgets"), err
}

// Example from https://stackoverflow.com/questions/70537979/how-to-efficiently-find-all-the-files-matching-a-particular-suffix-in-all-the-di
func FindFiles(roots []string, suffixes []string) ([]string, error) {
	var files []string
	var err error
	/*files = append(files, "walkDirTest")
	return files, nil*/
	for _, r := range roots {
		if err != nil {
			return nil, err
		}
		err = filepath.WalkDir(r, func(path string, d fs.DirEntry, err error) error {
			if d.IsDir() {
				return nil
			}

			for _, s := range suffixes {
				if strings.HasSuffix(path, s) {
					files = append(files, path)
					return nil
				}
			}

			return nil
		})
	}
	return files, err
}
