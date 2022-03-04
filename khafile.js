let project = new Project('DrawTest');
project.addSources('src');
project.addAssets('Assets/**');
project.addLibrary("hxColorToolkit");
resolve(project);
