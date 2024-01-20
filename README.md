# 키이스케이프 매크로

## Get Started

1. `npm install`

2. 파이썬 환경 세팅

    1. pyenv 설치(mac)

        `brew install`

        ```shell
        echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
        echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
        echo 'eval "$(pyenv init --path)"' >> ~/.bash_profile
        echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bash_profile
        source ~/.bash_profile
        ```

    2. pyenv-virtualenv

        `$ git clone https://github.com/pyenv/pyenv-virtualenv.git $(pyenv root)/plugins/pyenv-virtualenv`

    3. `pyenv versions` 명령어로 pyenv 설치 확인

    4. `pyenv install 3.11.4`

    5. `pyenv virtualenv 3.11.4 macro`

    6. `pyenv local `
