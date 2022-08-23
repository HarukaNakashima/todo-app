FROM ruby:slim

LABEL Name=todoposgrever Version=0.0.1


# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

WORKDIR /app
COPY . /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

CMD ["ruby", "todoposgrever.rb"]
